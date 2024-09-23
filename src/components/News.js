import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1, totalPages: 1 };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=6b1e75dd5b194dd78f51e7758151ad70&page=${this.state.page}&&pageSize=9`;
    let data = await fetch(url);
    let parsedData = await data.json();
    const totalPages = Math.ceil(parsedData.totalResults / 9);
    this.setState({ articles: parsedData.articles, totalPages });
  };

  handleNext = async () => {
    if (this.state.page < this.state.totalPages) {
      this.setState({ page: this.state.page + 1 }, this.fetchNews);
    }
  };

  handlePrev = async () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, this.fetchNews);
    }
  };

  render() {
    return (
      <div className="container my-5">
        <h1 className="text-center">News Today - Top Headlines!</h1>
        <div className="row ">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 " key={element.url}>
                <NewsItem
                  title={element.title ? element.title : "No Title Available"}
                  description={
                    element.description
                      ? element.description
                      : "No Description Available"
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "fallback-image-url.jpg"
                  }
                  NewsURL={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handlePrev}
            disabled={this.state.page <= 1}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
