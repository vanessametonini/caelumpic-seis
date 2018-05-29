import { FotoModule } from './foto.module';

describe('FotoModule', () => {
  let fotoModule: FotoModule;

  beforeEach(() => {
    fotoModule = new FotoModule();
  });

  it('should create an instance', () => {
    expect(fotoModule).toBeTruthy();
  });
});
