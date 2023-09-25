import React, { Component } from 'react'

 class NewsItem extends Component {
    
    
    render() {
        let {title,description,imgUrl,newsUrl}=this.props;
        return (
            <div>
                <div className="card my-6 " style={{width:"20rem"}} >
                    <img src={imgUrl} className="card-img-top" alt="..."/ >
                        <div className="card-body">
                            <h5 className="card-title">{title}    </h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl}  target='_blank'  rel="noreferrer"  className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>


            </div>
        )
    }
}

export default NewsItem