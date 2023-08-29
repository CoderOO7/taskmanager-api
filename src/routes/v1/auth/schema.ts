import { ApiTags } from "../../../enums";

const bodyRegisterSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: {
      type: "string",
      format: "email",
    },
    password: { type: "string", minLength: 8 },
  },
  required: ["name", "email", "password"],
  errorMessage: {
    required: {
      name: "name is required.",
      email: "email is required.",
      password: "password is required.",
    },
    properties: {
      email: "should be match a email.",
    },
  },
};

const bodyLoginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: { type: "string" },
  },
  required: ["email", "password"],
  errorMessage: {
    required: {
      email: "email is required.",
      password: "password is required.",
    },
    properties: {
      email: "should be match a email.",
    },
  },
};

const responseRegisterSchema = {
  token: { type: "string" },
};

const responseLoginSchema = {
  id: { type: "string" },
  name: { type: "string" },
  email: { type: "string" },
  token: { type: "string" },
};

const registerSchema = {
  tags: [ApiTags.auth],
  body: bodyRegisterSchema,
  response: {
    201: {
      type: "object",
      properties: responseRegisterSchema,
    },
  },
};

const loginSchema = {
  tags: [ApiTags.auth],
  body: bodyLoginSchema,
  response: {
    200: {
      type: "object",
      properties: responseLoginSchema,
    },
  },
};

export { loginSchema, registerSchema };
