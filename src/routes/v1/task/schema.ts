import { TASK_STATUS } from "../../../enums";

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
    title: { type: "string", minLength: 1 },
    description: { type: "string" },
  },
  required: ["title"],
  errorMessage: {
    required: {
      title: "title is required.",
    },
  },
};

const bodyUpdateSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    description: { type: "string" },
    status: { type: "string", enum: Object.values(TASK_STATUS) },
  },
  errorMessage: {
    properties: {
      status: `status can be any of following values ${Object.values(
        TASK_STATUS
      ).toString()}`,
    },
  },
};

const responseCreateSchema = {
  id: { type: "string" },
  title: { type: "string" },
  description: { type: "string" },
  status: { type: "string" },
  created_at: { type: "string" },
  updated_at: { type: "string" },
};

const responseGetOrUpdateSchema = {
  ...responseCreateSchema,
  created_by: { type: "string" },
  updated_by: { type: "string" },
};

const createSchema = {
  body: bodyCreateSchema,
  response: {
    201: {
      type: "object",
      properties: responseCreateSchema,
    },
  },
};

const updateSchema = {
  body: bodyUpdateSchema,
  response: {
    200: {
      type: "object",
      properties: responseGetOrUpdateSchema,
    },
  },
};

const getSchema = {
  response: {
    200: {
      type: "object",
      properties: responseGetOrUpdateSchema,
    },
  },
  params: getOrDeleteParamsSchema,
};

const getAllSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: responseGetOrUpdateSchema,
      },
    },
  },
};

const deleteSchema = {
  params: getOrDeleteParamsSchema,
};

export { createSchema, updateSchema, getSchema, getAllSchema, deleteSchema };
