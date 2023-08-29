import { ApiTags } from "../../../enums";

const getOrDeleteParamsSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
  },
  errorMessage: {
    properties: {
      id: "id must be valid uuid",
    },
  },
};

const bodyCreateSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: {
      type: "string",
      format: "email",
    },
    password: { type: "string" },
  },
  required: ["name", "email"],
  errorMessage: {
    required: {
      name: "name is required.",
      email: "email is required.",
    },
    properties: {
      email: "should be match a email.",
    },
  },
};

const bodyUpdateSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: {
      type: "string",
      format: "email",
    },
    password: { type: "string", minLength: 8 },
  },
  errorMessage: {
    properties: {
      email: "should be match a email.",
    },
  },
};

const responseCreateOrUpdateSchema = {
  id: { type: "string" },
  name: { type: "string" },
  email: { type: "string" },
  updated_at: { type: "string" },
  created_at: { type: "string" },
};

const createSchema = {
  tags: [ApiTags.user],
  description: "Create a new user",
  body: bodyCreateSchema,
  response: {
    201: {
      type: "object",
      properties: responseCreateOrUpdateSchema,
    },
  },
};

const updateSchema = {
  tags: [ApiTags.user],
  description: "Update user by id",
  body: bodyUpdateSchema,
  response: {
    200: {
      type: "object",
      properties: responseCreateOrUpdateSchema,
    },
  },
};

const getSchema = {
  tags: [ApiTags.user],
  description: "Get user by id",
  response: {
    200: {
      type: "object",
      properties: responseCreateOrUpdateSchema,
    },
  },
  params: getOrDeleteParamsSchema,
};

const getAllSchema = {
  tags: [ApiTags.user],
  description: "Get all users",
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: responseCreateOrUpdateSchema,
      },
    },
  },
};

const deleteSchema = {
  tags: [ApiTags.user],
  description: "Delete user by id",
  params: getOrDeleteParamsSchema,
};

export { createSchema, updateSchema, getSchema, getAllSchema, deleteSchema };
