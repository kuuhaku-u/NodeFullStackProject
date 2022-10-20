import { Schema, model, Types } from 'mongoose';
import mongoose from 'mongoose';
interface Itags {
	tag: string;
	qurstionID: Types.ObjectId;
}
const tagSchema = new Schema<Itags>({
	tag: {
		type: String,
	},
	qurstionID: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Question',
		},
	],
});
const Tags = mongoose.model('Tag', tagSchema);
export default Tags;
