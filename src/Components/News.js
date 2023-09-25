import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 3,
        category: 'general'
    }
    static propTypes = {

        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    constructor(props) {
        super(props)

        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }


    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?
        // country=${this.props.country}
        // category=${this.props.category}
        // &apikey=e0182cba72fb4d3ea8782c409174ec46&pageSize=${this.props.pageSize}`;


        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ab7e6ecfc42d4bb495a599fb12cf4e0a&pageSize=${this.props.pageSize}`
        this.setState({
            loading: true
        })
        console.log(this.props.pageSize);



        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        console.log(parsedData)

    }


    handlePrevClick = async () => {


        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e0182cba72fb4d3ea8782c409174ec46&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ab7e6ecfc42d4bb495a599fb12cf4e0a&pageSize=${this.props.pageSize}&page=${this.state.page-1}`
        this.setState({
            loading: true
        })
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })

        console.log(this.state.page)

    }



    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
            alert("No more pages available");
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ab7e6ecfc42d4bb495a599fb12cf4e0a&pageSize=${this.props.pageSize}&page=${this.state.page-1}`

            this.setState({
                loading: true
            });

            try {
                let data = await fetch(url);
                if (!data.ok) {
                    throw new Error(`Failed to fetch data: ${data.status} ${data.statusText}`);
                }

                let parsedData = await data.json();
                this.setState({
                    articles: parsedData.articles,
                    loading: false,
                    page: this.state.page + 1
                });
            } catch (error) {
                console.error(error);
                this.setState({
                    loading: false
                });
            }
        }
    };



    render() {
        return (
            <div className='container my-2'>
                <h2>News--Top Headlines</h2>

                {this.state.loading && <Spinner />}

                <div className='row d-flex justify-content-between'>
                    {this.state.articles && !this.state.loading ? (
                        this.state.articles.map((element) => (
                            <div className='col md-4' key={element.url}>
                                <NewsItem
                                    title={element.title.slice(0, 40).padEnd(50, '.')}
                                    description={element.description}
                                    imgUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No articles to display</p>
                    )}
                </div>
                <div className='container my-3 d-flex justify-content-between'>
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrevClick}
                    >
                        &larr; Prev
                    </button>
                    <button
                        disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                    >
                        &rarr; Next
                    </button>
                </div>
            </div>
        );
    }

}

export default News