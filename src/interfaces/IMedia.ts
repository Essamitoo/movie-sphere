
export interface IMedia  {
	image: string
	rate: number
	title: string
	id: number
	view?: boolean
	date: string
	genre: string
	age: string
	califications: number
	type: string
}



export interface IReview {
	id: number
	userImg: string;
	userName: string;
	reviewCount: number;
	comment: string;
	rating: number;
	date: Date;
  }


  export interface ITrailer {
	img: string;
	url: string;
  }
  
  export interface IPlatform {
	img: string;
	url: string;
  }
  
  export interface IReview {
	userImg: string;
	userName: string;
	reviewCount: number;
	comment: string;
	rating: number;
	date: Date;
  }
  
  export interface ISuggestion {
	img: string;
	url: string;
  }
  
  export interface IMediaPage {
	id: number;
	cover: string;
	name: string;
	image: string;
	sipnosis: string;
	trailers: ITrailer[];
	releaseDate: number;
	duration: string;
	series: string;
	cast:Cast[]
	platforms: IPlatform[];
	rating: number;
	reviews: IReview[];
	suggestions: ISuggestion[];
  }
 export interface Cast{
	actor:string;
    name:string;
    image:string;
}

export interface Movie {
	id: number;
	title: string;
	description: string;
	year: string;
	poster: string;
	splashart: string;
	duration: string;
  }
  
export interface Director {
	id: number
	name: string
	biography: string
	avatar: string
  }
  