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
    name: { type: "string" },
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
    name: { type: "string" },
    email: {
      type: "string",
      format: "email",
    },
    password: { type: "string" },
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
  body: bodyCreateSchema,
  response: {
    201: {
      type: "object",
      properties: responseCreateOrUpdateSchema,
    },
  },
};

const updateSchema = {
  body: bodyUpdateSchema,
  response: {
    200: {
      type: "object",
      properties: responseCreateOrUpdateSchema,
    },
  },
};

const getSchema = {
  response: {
    200: {
      type: "object",
      properties: responseCreateOrUpdateSchema,
    },
  },
  params: getOrDeleteParamsSchema,
};

const getAllSchema = {
  response: {
    200: {
      type: "array",
      properties: responseCreateOrUpdateSchema,
    },
  },
};

const deleteSchema = {
  params: getOrDeleteParamsSchema,
};

export { createSchema, updateSchema, getSchema, getAllSchema, deleteSchema };
