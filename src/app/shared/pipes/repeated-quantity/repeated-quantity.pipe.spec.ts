import { RepeatedQuantityPipe } from './repeated-quantity.pipe';

xdescribe('RepeatedQuantityPipe', () => {
  it('create an instance', () => {
    const pipe = new RepeatedQuantityPipe();
    expect(pipe).toBeTruthy();
  });
});
