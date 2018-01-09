import { Ng2PlatformHarmonizationDashboardPage } from './app.po';

describe('ng2-platform-harmonization-dashboard App', () => {
  let page: Ng2PlatformHarmonizationDashboardPage;

  beforeEach(() => {
    page = new Ng2PlatformHarmonizationDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
