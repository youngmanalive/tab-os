import { observer } from 'mobx-react';
import { useEffect } from 'react';

import type { Quote as QuoteContent } from 'data/widgetModel';
import { useWidget } from 'context/widget';

const fetchQuote = () =>
  fetch('https://api.quotable.io/random').then((response) =>
    response.ok ? response.json() : Promise.reject()
  );

const shouldFetch = (lastRequested: number) =>
  (Date.now() - lastRequested) / 60000 > 60;

const Quote = () => {
  const widget = useWidget<QuoteContent>();
  const quote = widget.content.data;
  const isStale = shouldFetch(quote.lastRequested);

  useEffect(() => {
    if (isStale) {
      fetchQuote()
        .then(({ content, author }) => {
          widget.setContentData({
            author,
            content,
            lastRequested: Date.now(),
          });
        })
        .catch(() => {
          console.warn('Failed to fetch quote!');
        });
    }
  }, [isStale]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!quote.content || isStale) return <div />;

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <p>"{quote.content}"</p>
      <p>- {quote.author}</p>
    </div>
  );
};

export default observer(Quote);
