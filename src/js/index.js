import '../styles/index.scss';
import $ from 'jquery';
import fetchQuote from './fetchQuote';
import buildQuoteDom from './buildQuoteDom';
import generateQuote from './generateQuote';
import tweetQuote from './tweetQuote';
 
$(document).ready(function() {
  fetchQuote(buildQuoteDom);
  generateQuote();
  setTimeout(function(){
    tweetQuote();
  }, 2000);
 });

if (module.hot) {
  module.hot.accept();
}
