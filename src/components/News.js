import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 15,
        category : 'general'
    }
     
    static propTypes = {
        country :  PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }


    capitalize=(word)=>{
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    constructor(props){
        super(props);
        this.state  = {
            articles : [],
            loading : true,
            page: 1,
            totalResults :0
        }
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
    }

    async updatenews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.newsapikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            totalResults : parsedData.totalResults,
            articles : parsedData.articles,
            loading: false
        })
        // console.log(this.state.page, this.state.totalResults, this.state.articles.length)
    }
    
    async componentDidMount(){
        // console.log("cdm")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.newsapikey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     articles : parsedData.articles,
        //     totalResults : parsedData.totalResults,
        //     loading: false
        // })
        this.updatenews()
    }
    
    handlePrevClick = async () =>{
        // console.log("Prev click")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.newsapikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        this.setState({
            page : this.state.page - 1,
            // articles : parsedData.articles,
            // loading: false
        })
        this.updatenews()
    }

    handleNextClick = async () =>{
        // console.log("Next click")
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){}
        else
        {
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.newsapikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // this.setState({loading:true})
            // let data = await fetch(url)
            // let parsedData = await data.json()
            this.setState({
                page : this.state.page + 1,
                // articles : parsedData.articles,
                // loading:false
            })
            this.updatenews()
        }
    }

    fetchMoreData = async () => {
        this.setState({
            page : this.state.page + 1,
            // articles : parsedData.articles,
            // loading:false
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.newsapikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            totalResults : parsedData.totalResults,
            articles : this.state.articles.concat(parsedData.articles),
            // loading: false
        })
        console.log(this.state.page, this.state.totalResults, this.state.articles.length)
      }

    render() {
        // console.log("render")
        return (
            < >
                <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines from {this.capitalize(this.props.category)}</h1>
                {this.state.loading && < Spinner/> }
                {/* {!this.state.loading && <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button"  className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled = {this.state.page+1  > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div>} */}

                <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length<this.state.totalResults}
                        loader={< Spinner/>}
                >
                <div className="container">
                <div className="row">
                    {this.state.articles.map((element)=>{
                        // console.log(element.title)
                        return <div className="col-md-4" key = {element.url}>
                            <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,100):""} imageUrl = {element.urlToImage?element.urlToImage:"https://image.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg"} newsUrl = {element.url} author = {element.author?element.author:"Unknown"} date = {new Date(element.publishedAt).toGMTString()} source = {element.source.name}/>    
                            </div>
                    })}
                </div>
                </div>
                </InfiniteScroll>

                {/* {!this.state.loading && <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button"  className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled = {this.state.page+1  > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div>} */}

            </>
        )
    }
}

export default News
