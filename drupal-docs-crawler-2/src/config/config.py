class CrawlerConfig:
    # Starting URL for the crawler
    START_URL = 'https://drupal.org/docs/getting-started'

    # Maximum depth of links to crawl (12 levels of nesting)
    MAX_DEPTH = 3

    # CSS selector to find internal links within the main content block
    INTERNAL_LINK_SELECTOR = '#block-system-main .pane-content a[href^="/"]'

    # Output file path
    OUTPUT_FILE = 'output/drupal_getting_started_docs_tree.json'

    # Request headers to mimic a browser
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
    }

    # Delay between requests (in seconds) to be respectful to the server
    REQUEST_DELAY = 1
