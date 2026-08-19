import React, { Component } from "react";
import NewItems from "./NewItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string,
  };
  constructor() {
    super();
    console.log("I am a constructor from News component");
    this.state = {
      articles: [], // ✅ now it exists
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd4e17b3ec0a4bad8386850970dc824e&page=1&pageSize=20`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd4e17b3ec0a4bad8386850970dc824e&page=${
      this.state.page - 1
    }&pageSize=20`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd4e17b3ec0a4bad8386850970dc824e&page=${
      this.state.page + 1
    }&pageSize=20`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <div className="row m-5">
        <h2 className="text-center">NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        {!this.state.loading &&
          this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewItems
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://media.nbcchicago.com/2025/02/AP25030754565213.jpg?quality=85&strip=all&resize=1200%2C675"
                  }
                  date={element.publishedAt.split('T')[0]+"  "+element.publishedAt.split('T')[1].replace('Z','')}
                  url={element.url}
                />
              </div>
            );
          })}
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >= Math.ceil(this.state.totalResults / 20)
            }
            type="button"
            class="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
