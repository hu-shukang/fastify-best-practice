import auth from '@fastify/auth';
import { FastifyPluginAsync, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import fp from 'fastify-plugin';

const verifyAdmin = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  // check if the user is an admin
  done(); // pass an error if the authentication fails
};

const verifySemiAdmin = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  // check if the user is a semi-admin
  done(); // pass an error if the authentication fails
};

const authPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('verifyAdmin', verifyAdmin).decorate('verifySemiAdmin', verifySemiAdmin).register(auth);
});

export default authPlugin;
