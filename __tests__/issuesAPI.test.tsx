import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Page1 from '../__tests__/__mocks__/Issues/Page1.json'
import { getIssues } from '../api/issuesAPI';

beforeEach(() => {
    
});

describe('getIssues', () => {
    it('returns correct data', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet("https://api.github.com/search/issues?q=is:issue+is:open+repo:rails/rails&per_page=15&page=1")
            .reply(200, Page1.data, Page1.pageLinks);

        await getIssues('rails', 'rails', 1).then(issues => {
            expect(issues.data.total_count).toEqual(348);
            expect(issues.data.incomplete_results).toEqual(false);
            expect(issues.data.items).toEqual(Page1.data.items);
        });
    });

    it('parses links correctly', async () => {
        const mock = new MockAdapter(axios);
        const headers = {link: "<https://api.github.com/search/issues?q=is%3Aissue+is%3Aopen+repo%3Arails%2Frails&per_page=15&page=2>; rel=\"next\", <https://api.github.com/search/issues?q=is%3Aissue+is%3Aopen+repo%3Arails%2Frails&per_page=15&page=24>; rel=\"last\""};
        mock.onGet("https://api.github.com/search/issues?q=is:issue+is:open+repo:rails/rails&per_page=15&page=1")
            .reply(200, Page1.data, headers);

        await getIssues('rails', 'rails', 1).then(issues => {
            expect(issues.data.incomplete_results).toEqual(false);
            expect(issues.pageLinks).toEqual({
                "last": {
                    "page": "24",
                    "per_page": "15",
                    "q": "is:issue is:open repo:rails/rails",
                    "rel": "last",
                    "url": "https://api.github.com/search/issues?q=is%3Aissue+is%3Aopen+repo%3Arails%2Frails&per_page=15&page=24"
                    },
                "next": {
                    "page": "2",
                    "per_page": "15",
                    "q": "is:issue is:open repo:rails/rails",
                    "rel": "next",
                    "url": "https://api.github.com/search/issues?q=is%3Aissue+is%3Aopen+repo%3Arails%2Frails&per_page=15&page=2"
                }
            });
        });
    });
});