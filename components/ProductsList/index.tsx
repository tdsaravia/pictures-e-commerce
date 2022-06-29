import React, {useState,useReducer, useEffect} from 'react';
import { db } from '../../config';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../../styles/ProductsList.module.scss';
import Product from '../Product'
import { Pagination } from "@material-ui/lab";
import usePagination from '../Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import arrow from '../../images/icons/Arrows.png'
import Image from 'next/image'


const LESS_THAN_20 = 'LESS_THAN_20';
const BTW_20_AND_100 = 'BTW_20_AND_100';
const BTW_100_AND_200 = 'BTW_100_AND_200';
const MORE_THAN_200 = 'MORE_THAN_200';

const PRICE_RANGES = {
    [LESS_THAN_20]: (row) => row.price < 20,
    [BTW_20_AND_100]: (row) => row.price >= 20 && row.price < 100,
    [BTW_100_AND_200]: (row) => row.price >= 100 && row.price < 200,
    [MORE_THAN_200]: (row) => row.price >= 200

}


  const ProductsList = () => {
    const dbInstance = collection(db, 'products');
    const [todos,setTodos] = useState([]);
    const [globalTodos,setGlobalTodos] = useState([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<{people?:boolean,premium?:boolean,pets?:boolean,food?:boolean,nature?:boolean,cities?:boolean,landmarks?:boolean}>({});
    const [priceRangeComparator, setPriceRangeComparator] = useState<string>('');
    const [page, setPage] = useState(1);
    const PER_PAGE = 6;
    const [count, setCount] = useState(0);
    const _DATA = usePagination(todos, PER_PAGE);
    const [current, setCurrent] = useState("unsorted");
    const [sortValue, setSortValue] = useState('true')
    const [cart, setCart] = useState([]);


    const addToCart = (i) => {
        setTodos((state) =>
          state.map((item, p) => {
            if (i === p) {
              setCart([
                ...cart,
                { name: item.name, price: item.price, category: item.category }
              ]);
              return { ...item, inCart: true };
            }
            return item;
          })
        );
      };
//Sort Function by Price and Name
const initialState = {
    isSorted: false,
    isDesc: false
  };
const [state, dispatch] = useReducer(sortReducer, initialState);

function sortReducer(state, action) {
    switch (action.type) {
      case "unsorted":
        return {
          isSorted: true,
          isDesc: false
        };
      case "asc":
        return {
          isSorted: true,
          isDesc: true
        };
      case "desc":
        return {
          isSorted: true,
          isDesc: false
        };
      default:
        return { isSorted: state.isSorted, isDesc: state.isDesc };
    }
  }
function dispatchSort(sortValue) {
    let sortData = [...globalTodos];
    if(sortValue == 'true'){
        if (current === "unsorted") {
        setCurrent("asc");
        dispatch({ type: "unsorted" });
        sortData = [...todos].sort((a, b) => {
            return b.price - a.price;
            
          });
        } else if (current === "asc") {
        setCurrent("desc");
        dispatch({ type: "asc" });
        sortData = [...todos].sort((a, b) => {
            return a.price - b.price;
            
          });
        } else {
        setCurrent("asc");
        dispatch({ type: "unsorted" });
        sortData = [...todos].sort((a, b) => {
            return b.price - a.price;
            
          });        
        }
        setTodos(sortData);
    } else {
        if (current === "unsorted") {
            setCurrent("asc");
            dispatch({ type: "unsorted" });
            sortData = [...globalTodos].sort((a, b) => (a.name > b.name ? 1 : -1))

            } else if (current === "asc") {
            setCurrent("desc");
            dispatch({ type: "asc" });
            sortData = [...globalTodos].sort((a, b) => (a.name < b.name ? 1 : -1))

            } else {
            setCurrent("asc");
            dispatch({ type: "unsorted" });
            sortData = [...globalTodos].sort((a, b) => (a.name > b.name ? 1 : -1))
            setTodos(sortData);
    }
    setTodos(sortData);
  }
}

    const getNotes = () => {
      getDocs(dbInstance)
          .then((data) => {
            setGlobalTodos(data.docs.map((item) => {
                  return { ...item.data(), id: item.id }
              }));
          })
  }

  useEffect( () => {
    getNotes();
  },[]);

useEffect (() => {
    if(globalTodos.length) {
        setLoading(false)
        setTodos(globalTodos)
        setCount(Math.ceil(globalTodos.length / PER_PAGE))
    }
},[globalTodos])


// Categories Filters
  const handleCheckedPremium = (e) => {
    setFilters({...filters, premium: e.target.checked})
  };
  const handleCheckedPeople = (e) => {
    setFilters({...filters, people: e.target.checked})
 
  };
  const handleCheckedPets = (e) => {
    setFilters({...filters, pets: e.target.checked})

  };
  const handleCheckedFood = (e) => {
    setFilters({...filters, food: e.target.checked})

  };
  const handleCheckedLandmarks = (e) => {
    setFilters({...filters, landmarks: e.target.checked})

  };
  const handleCheckedCities = (e) => {
    setFilters({...filters, cities: e.target.checked})

  };
  const handleCheckedNature = (e) => {
    setFilters({...filters, nature: e.target.checked})
  };


  useEffect(() => {
        if(!globalTodos.length) return 
        let newTodos = globalTodos;
        const categories = Object.keys(filters).filter(k => filters[k])
        if(categories.length) newTodos = globalTodos.filter((row) => categories.includes(row.category.toLowerCase()))
        
        if(priceRangeComparator) newTodos = newTodos.filter(PRICE_RANGES[priceRangeComparator])
        setTodos(newTodos)
        setPage(1)
        _DATA.jump(1);
        setCount(Math.ceil(newTodos.length / PER_PAGE))

  },[filters, priceRangeComparator])

// Price Range Filters

const handlePriceRangeChange = (range) => {
    setPriceRangeComparator(range);
} 

// Pagination
const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
};

const handleChangeSort = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
};
    return (
        <div>
            <div className={styles.products_selectors}>
                <div className={styles.text_type}>
                    <h3>Photography / </h3>
                    <p>Premium Photos</p>
                </div>
                <div className={styles.sort}>
                <button onClick={() => dispatchSort(sortValue)}>
                    <Image src={arrow} alt="arrows"/>
                </button>
                <p>sort by</p>
                <div className={styles.select}>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <Select
                    value={sortValue}
                    onChange={handleChangeSort}
                    autoWidth
                    defaultValue="true"
                    >
                    <MenuItem value='true'>Price</MenuItem>
                    <MenuItem value='false'>A-Z</MenuItem>
                    </Select>
                </FormControl>
                </div>
                </div>
            </div>
            <div className={styles.products_content}>
                <div className={styles.products_container}>
                    <div>
                        <h3>Category</h3>
                        <p>
                            <input type="checkbox" onChange={handleCheckedPeople} checked={filters.people || false}/> People
                        </p>
                        <p>
                            <input type="checkbox" onChange={handleCheckedPremium} checked={filters.premium || false}/> Premium
                        </p>
                        <p>
                            <input type="checkbox" onChange={handleCheckedPets} checked={filters.pets || false}/> Pets
                        </p>
                        <p>
                            <input type="checkbox" onChange={handleCheckedFood} checked={filters.food || false}/> Food
                        </p>
                        <p>
                        <input type="checkbox" onChange={handleCheckedLandmarks} checked={filters.landmarks || false}/> Landmarks
                        </p>
                        <p>
                        <input type="checkbox" onChange={handleCheckedCities} checked={filters.cities || false}/> Cities
                        </p>
                        <p>
                        <input type="checkbox" onChange={handleCheckedNature} checked={filters.nature || false}/> Nature
                        </p>
                    </div>
                    <Divider/>
                    <div>
                    <h3>Price Range</h3>
                    <p>

                    <input type="checkbox" onChange={() => handlePriceRangeChange(priceRangeComparator != LESS_THAN_20 ? LESS_THAN_20 : '' )} checked={priceRangeComparator == LESS_THAN_20}/>Lower than 20$
                        </p>
                        <p>
                        <input type="checkbox" onChange={() => handlePriceRangeChange(priceRangeComparator != BTW_20_AND_100 ? BTW_20_AND_100 : '' )} checked={priceRangeComparator == BTW_20_AND_100}/> 20$ - 100$
                        </p>
                        <p>
                        <input type="checkbox" onChange={() => handlePriceRangeChange(priceRangeComparator != BTW_100_AND_200 ? BTW_100_AND_200 : '')} checked={priceRangeComparator == BTW_100_AND_200}/> 100$ - 200$
                        </p>
                        <p>
                        <input type="checkbox" onChange={() => handlePriceRangeChange(priceRangeComparator != MORE_THAN_200 ? MORE_THAN_200 : '')} checked={priceRangeComparator == MORE_THAN_200}/> More than 200$
                        </p>
    
                    </div>
                </div>
                <div className={styles.products}>
                    <div>
                    <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{minWidth:'1000px', width:'70%'}}>
                        {
                            loading ? (
                            <div>
                                <h2>Loading</h2>
                            </div>
                            ): 
                            todos.length === 0 ? (
                            <div>
                                <h2>No undone todos</h2>
                            </div>
                            ) : (
                                _DATA.currentData.map((todo,index) => {
                                return (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <Product data={todo}/>
                                </Grid>
                                )
                            })
                            )
                        }
                        </Grid>
                    </Box>
                    </div>
                    <Pagination
                            count={count}
                            size="large"
                            page={page}
                            onChange={handleChange}
                        />
                </div>
            </div>
        </div>
    )
}

export default ProductsList;