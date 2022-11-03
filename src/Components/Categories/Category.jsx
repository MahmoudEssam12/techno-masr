import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import data from "./../../data.json";
import styles from "./Category.module.scss";
import ProductCard from "../Card/ProductCard";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
const getCategories = () => {
  let categories = data.map((product) => product.category);
  let uniqueCategories = [...new Set([...categories])];
  return uniqueCategories;
};

const getMinMaxPrice = () => {
  let prices = data.map((product) => Number(product.price));
  return [Math.min(...prices), Math.max(...prices)];
};

const ratings = [1, 2, 3, 4, 5];

function Category() {
  const [searchValue, setSearchValue] = useState("");
  const [categories] = useState(getCategories);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([
    getMinMaxPrice()[0],
    getMinMaxPrice()[1],
  ]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const filteredProducts = data
    .filter((product) => {
      return product.name.toLowerCase().includes(searchValue.toLowerCase());
    })
    .filter((product) => {
      if (categoriesFilter.length)
        return categoriesFilter.includes(product.category);
      return product;
    })
    .filter((product) => {
      if (ratingFilter.length)
        return ratingFilter.includes(product.rating + "");
      return product;
    })
    .filter((product) => {
      return (
        Number(product.price) <= priceRangeFilter[1] &&
        Number(product.price) >= priceRangeFilter[0]
      );
    });

  //to set the checkbox value
  const checked = (value, arr) => {
    return arr.includes(value + "");
  };

  const handleCheckboxChange = (e, type) => {
    if (type === "category") {
      if (e.target.checked) {
        setCategoriesFilter((prev) => [...prev, e.target.value]);
      } else {
        setCategoriesFilter((prev) => {
          return prev.filter((rating) => rating !== e.target.value);
        });
      }
    } else {
      if (e.target.checked) {
        setRatingFilter((prev) => [...prev, e.target.value]);
      } else {
        setRatingFilter((prev) => {
          return prev.filter((rating) => rating !== e.target.value);
        });
      }
    }
  };

  const priceRangeFilterChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRangeFilter([
        Math.min(newValue[0], priceRangeFilter[1] - 10),
        priceRangeFilter[1],
      ]);
    } else {
      setPriceRangeFilter([
        priceRangeFilter[0],
        Math.max(newValue[1], priceRangeFilter[0] + 10),
      ]);
    }
  };

  const resetAll = () => {
    setPriceRangeFilter([getMinMaxPrice()[0], getMinMaxPrice()[1]]);
    setRatingFilter([]);
    setCategoriesFilter([]);
  };

  useEffect(() => {}, []);

  return (
    <Container maxWidth="xl" className={styles.wrapper}>
      <div className={styles.search}>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            id="search"
            sx={{ backgroundColor: "#fff" }}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            label="Search field"
            type="search"
            fullWidth
          />
        </FormControl>
      </div>
      <section className={styles.categories_wrapper}>
        <nav className={styles.sidenav}>
          <div className={styles.filters}>
            <Accordion onClick={resetAll} disableGutters>
              <AccordionSummary aria-controls="resetAll" id="resetAll">
                <Typography>Reset All</Typography>
              </AccordionSummary>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="categories"
                id="categories"
              >
                <Typography>Categories</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {categories.map((category) => (
                  <FormGroup key={category}>
                    <FormControlLabel
                      name={category}
                      control={
                        <Checkbox
                          checked={checked(category, categoriesFilter)}
                        />
                      }
                      label={category}
                      value={category}
                      onChange={(e) => handleCheckboxChange(e, "category")}
                    />
                  </FormGroup>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="rating"
                id="rating"
              >
                <Typography>Rating</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.rating_wrapper}>
                {ratings.map((rating) => (
                  <FormGroup key={rating}>
                    <FormControlLabel
                      name={`rating-${rating}`}
                      control={
                        <Checkbox checked={checked(rating, ratingFilter)} />
                      }
                      label={
                        <Rating
                          name="size-medium"
                          defaultValue={rating}
                          readOnly
                        />
                      }
                      value={rating}
                      onChange={(e) => handleCheckboxChange(e, "ratings")}
                    />
                  </FormGroup>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="price"
                id="price"
              >
                <Typography>Price</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={priceRangeFilter}
                  onChange={priceRangeFilterChange}
                  valueLabelDisplay="auto"
                  disableSwap
                  min={getMinMaxPrice()[0]}
                  max={getMinMaxPrice()[1]}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        </nav>
        <section className={styles.products_grid}>
          {filteredProducts
            .slice([6 * page], [6 * (page + 1)])
            .map((product) => (
              <ProductCard
                key={product.id}
                image={product.images[0]}
                title={product.name}
                price={product.price}
                description={product.description}
                brand={product.brand}
                rating={product.rating}
                color={product.color}
                inStock={product.inStock}
                id={product.id}
              />
            ))}
        </section>
      </section>
      <div className={styles.pagination_wrapper}>
        <Pagination
          count={Math.ceil(data.length / 6)}
          onChange={(e, p) => {
            setPage(p - 1);
          }}
          color="primary"
        />
      </div>
    </Container>
  );
}

export default Category;
