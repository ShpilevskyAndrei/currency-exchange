import { RemoveTrailingZerosPipe } from './remove-trailing-zeros.pipe';

describe('RemoveTrailingZerosPipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveTrailingZerosPipe();
    expect(pipe).toBeTruthy();
  });
});
