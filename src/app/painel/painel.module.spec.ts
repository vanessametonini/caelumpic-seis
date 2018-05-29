import { PainelModule } from './painel.module';

describe('PainelModule', () => {
  let painelModule: PainelModule;

  beforeEach(() => {
    painelModule = new PainelModule();
  });

  it('should create an instance', () => {
    expect(painelModule).toBeTruthy();
  });
});
