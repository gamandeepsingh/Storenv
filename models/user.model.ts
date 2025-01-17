import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already taken"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already taken"],
    },
    image: {
      type: String,
      default: "https://xsgames.co/randomusers/avatar.php?g=pixel",
    },
    envs:[
        {
            type: Schema.Types.ObjectId,
            ref: "Env",
        },
    ]
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;