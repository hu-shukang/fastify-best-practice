import { FastifyPluginAsync } from 'fastify';
import Ajv from 'ajv';
import AjvErrors from 'ajv-errors';
import AjvFormats from 'ajv-formats';
import fp from 'fastify-plugin';

const getAjvInstance = (coerceTypes: boolean) => {
  const ajv = AjvErrors(
    new Ajv({
      allErrors: true,
      $data: true,
      removeAdditional: true,
      coerceTypes: coerceTypes,
    }),
  );

  AjvFormats(ajv);

  return ajv;
};

const ajv = getAjvInstance(false);
const ajvWithCoerce = getAjvInstance(true);

const schemaCompilers: Record<string, Ajv> = {
  body: ajv,
  params: ajv,
  querystring: ajvWithCoerce,
};

const ajvPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.setValidatorCompiler((req) => {
    if (!req.httpPart) {
      throw new Error('httpPart is required');
    }
    const compiler = schemaCompilers[req.httpPart];
    if (!compiler) {
      throw new Error('Invalid httpPart');
    }
    return compiler.compile(req.schema);
  });
});

export default ajvPlugin;
