import { Str } from '@/utils/string.util';

describe('string util', () => {
  describe('uuid', () => {
    it('should return a valid UUID', () => {
      const uuid = Str.uuid();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });
  });
});
