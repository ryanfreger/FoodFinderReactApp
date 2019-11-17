import React from 'react';
import '../App.css';
import Infocard from './InfoCard'
import Recipecard from './RecipeCard'
import Tabs from './Tabs';
import SearchBar from './SearchBar';

//Object used for styling container div below
const container = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  justifyContent: 'center',
  textAlign: 'center'
};

const SearchResults = (props) => (
  <div>
    <SearchBar
      callback={props.searchFoodBoth}
    />
    {/* Conditional to show an Error Message if something went wrong with the request, else show the results */}
    {props.errorMessage !== '' ?
      <div style={container}>
        <h1>{props.errorMessage}</h1>
      </div>
      :
      <div style={container}>
        {/* Conditional to show loading spinner before results come back based on state */}
        {props.isLoaded === true ?
          <div>
            {props.restaurants.length > 0 ?
              <Tabs>Eat Out
              <div className="row align-items-center justify-content-center flex-container">
                  {props.restaurants && props.restaurants.map((index, item) => (
                    <div className="col col-4">
                      <Infocard
                        key={item}
                        name={index.name}
                        img={index.image_url}
                        price={index.price}
                        rating={index.rating}
                        address={index.location.display_address}
                        phone={index.display_phone}
                        isClosed={index.is_closed}
                        yelpURL={index.url}
                        reviewCount={index.review_count}
                        id={index.id}
                        city={index.city}
                        stateName={index.state}
                        yelpLatitude={index.yelpLatitude}
                        yelpLongitude={index.yelpLongitude}
                      />
                    </div>
                  ))}
                </div>
                Dine In
 <div className="row align-items-center justify-content-center">
                  {props.recipes && props.recipes.map((index, item) => (
                    <div className="col col-4">
                      <Recipecard
                        key={item}
                        recipeLabel={index.recipe.label}
                        recipeImg={index.recipe.image}
                        ingredientList={index.recipe.ingredientLines}
                        recipeCalories={index.recipe.calories}
                        yield={index.recipe.yield}
                        dietLabels={index.recipe.dietLabels}
                        totalFat={index.recipe.totalNutrients.FAT.quantity}
                        totalCarbs={index.recipe.totalNutrients.CHOCDF.quantity}
                        totalProtein={index.recipe.totalNutrients.PROCNT.quantity}
                      />
                    </div>
                  ))}
                </div>
              </Tabs> : null}
          </div>
          : <img src="https://www.idlewild.org/wp-content/plugins/embed-bible-passages/images/ajax-loading.gif" />}
      </div>
    }
  </div>
)
export default SearchResults;