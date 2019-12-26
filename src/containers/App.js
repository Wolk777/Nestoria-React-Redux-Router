import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../components/footer/footer.jsx';
import Header from '../components/header/header.jsx';
import List from '../components/list/list.jsx';
import Loader from '../components/loader/loader.js';
import PortalError from '../components/portalError/portalError.jsx';
import SectionListings from '../components/sectionListings/sectionListings.jsx';
import WindowDetail from '../components/windowDetail/windowDetail.jsx';
import WrapperContent from '../components/wrapperContent/wrapperContent.jsx';
import { requestListings, fetchListings, changeFavorite, changePage, setResponseStatus,
 clearListings, openModal, closeModal, removeFavoriteListing, addFavoriteListing } from './../actions/actionCreator.js';
import './App.css';

class App extends Component {
  state = {
    inputLocation:'',
    detailedListingId:'',
  }

  handleLocation = ({target:{ value }}) => {
    this.setState({inputLocation: value});
  }

  searchListings = () => {
    const { inputLocation } = this.state;
    let { page } = this.props.request;

    this.props.clearListings();
    if (inputLocation === '') {
      this.props.setResponseStatus('invalidResponse', 'Search fields are empty! Please enter a place to search!');
      this.props.openModal();
      return;
    }
    this.props.history.push('/');
    this.setState({inputLocation: ''});
    this.props.fetchListings(inputLocation, page);
  }

  handleFavorite = id => {
    let listings = this.props.listings;
    let listing = listings.find(list => list.id === id);
    let favoriteListings = this.props.favoriteListings;
    let favoriteListing = favoriteListings.find(list => list.id === id);
    if (favoriteListing) {
      this.props.removeFavoriteListing(id);
    } else {
      this.props.addFavoriteListing(listing);
    }
    this.props.changeFavorite(id);
  }
  
  handleLoadMore = () => {
    let { location, page } = this.props.request;
    let newpage = ++page;

    this.props.changePage(newpage);
    this.props.fetchListings(location, newpage);
  }

  handleDetailed = id => {
    console.log(id);
    this.setState({detailedListingId: id});
    this.props.history.push('/listing');
  }

  render() {
    let { listings, request } = this.props;
    let { inputLocation,  detailedListingId} = this.state;
    let isOpenModal = this.props.modal;
    let favoriteListings = this.props.favoriteListings;
    let detailListing = listings.length ? listings.find(listing => listing.id === detailedListingId) : 
      favoriteListings.find(listing => listing.id === detailedListingId);
    let messageEmpty = 'The list of favorite ads is empty. Click on the red heart to add an ad to your favorites.';

    return (
      <div className='wrapper'>
        <Header onHandleLocation={this.handleLocation} value={inputLocation} onSearch={this.searchListings}/>
        <section id="main" className="main">
          {request.isFetching && <div><Loader /></div>}
          <Switch>
            <Route path='/' exact render={() => (
              <SectionListings 
                listings={listings}
                onFavorite={this.handleFavorite}
                onHandleDetailed={this.handleDetailed}
                onHandleLoad={this.handleLoadMore}/>
            )}/>
            <Route path='/favorite' render={() => (
              <WrapperContent>
                { favoriteListings.length === 0 ? 
                  <h2 className='favoriteEmpty'>{messageEmpty}</h2> :
                  <List 
                    listings={favoriteListings}
                    onHandleDetailed={this.handleDetailed}
                    onFavorite={this.handleFavorite}/>
                }
              </WrapperContent>
            )}/>
            <Route path='/listing' render={() => (
              <WrapperContent>
                <WindowDetail detailListing={detailListing} onFavorite={this.handleFavorite}/>                
              </WrapperContent>
            )}/>
          </Switch>
        </section>
        <Footer/>
        {isOpenModal &&         
          <PortalError>
            <div className="madalOverlay">
              <div className="modalWindow">
                <div className="modalHeader">
                  <i className='fa fa-times' onClick={this.props.closeModal}></i>
                </div>
                <div className="modalBody">{request.errorMessage}</div>
              </div>
            </div>
          </PortalError>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listings,
  modal: state.modal,
  request: state.request,
  favoriteListings: state.favoriteListings,
});

const mapDispatchToProps = dispatch => ({
  changeFavorite: id => dispatch(changeFavorite(id)),
  changePage: page => dispatch(changePage(page)),
  clearListings: () => dispatch(clearListings()),
  closeModal: () => dispatch(closeModal()),
  fetchListings: (location, page) => dispatch(fetchListings(location, page)),
  openModal: () => dispatch(openModal()),
  requestListings: location => dispatch(requestListings(location)),
  setResponseStatus: (status, message) => dispatch(setResponseStatus(status, message)),
  removeFavoriteListing: id => dispatch(removeFavoriteListing(id)),
  addFavoriteListing: listing => dispatch(addFavoriteListing(listing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));