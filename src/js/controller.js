import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async () => {
  try {
    recipeView.renderSpinner();

    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return recipeView.renderMessage();

    await model.loadRecipe(id);
    // console.log(model.state);
    model.getBookmarks();
    bookmarksView.render(model.state.bookmarks);
    resultsView.update(model.getSearchResultsPage());
    recipeView.render(model.state.recipe);
    // bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    // console.log(err);
    recipeView.renderError(err.message);
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;
    // console.log(query);
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(1));
    // resultsView.render(1);

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err.message);
  }
};

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

const controlPagination = function (goto) {
  console.log('control pagination..');
  resultsView.render(model.getSearchResultsPage(goto));
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  model.updateServings(servings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update();
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  // model.getBookmarks();
};

init();
