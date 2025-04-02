export interface IMedia {
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
	userImg: string;
	userName: string;
	reviewCount: number;
	comment: string;
	rating: number;
	date: Date;
  }
  