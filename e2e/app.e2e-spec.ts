import { MemsourceClientPage } from './app.po';

describe('memsource-client App', function() {
  let page: MemsourceClientPage;

  beforeEach(() => {
    page = new MemsourceClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
