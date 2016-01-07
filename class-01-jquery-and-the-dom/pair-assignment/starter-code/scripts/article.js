var articles = [];

function Article (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.data('category', this.category);
  // TODO: None remaining
  $newArticle.find('a').attr('href', this.authorUrl).text(this.author);//finds the anchor tag and updates/gives it an href value. The .text() is just another method chained to reduce code. Explicitly it means $newArticle.find('a').text(this.author).
  $newArticle.find('h1').text(this.title);//finds any h1 tag within article and changes the text to whatever the new article title is.
  $newArticle.find('section').html(this.body);//finds the section and puts the body data into it. Using .html() method since the body data is stored as html elements.
  $newArticle.find('time[pubdate]').attr('pubdate', this.publishedOn);//creates a new pubdate attribute using the post's publishedOn data.

  // Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newArticle.append('<hr>');

  // TODO: None remaining
  $newArticle.removeClass('template');//removes the template class since it is no longer a template, but an instance of that template being used.

  return $newArticle;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
