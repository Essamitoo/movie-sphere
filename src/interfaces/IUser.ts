import { IMedia, IReview } from './IMedia'

export interface IUser {
	id: string
	name: string
	email: string
	avatar: string
	avatar_token: string
	account: string
	role: string
	token: string
	provider: string
	favorites: IMedia[]
	reviews: IReview[]
	views: IMedia[]
	list: IMedia[]
}
