import { useState } from 'react';

const EMOJIS = Array.from('😎🤠🤘😺😊😁🤖😌🤙👊🙋💆🌞🌝💫🚀');

const getRandomEmoji = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

const Emoji = () => {
  const [emoji, setEmoji] = useState(getRandomEmoji);

  return (
    <div
      onClick={() => setEmoji(getRandomEmoji)}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        cursor: 'pointer',
        fontSize: 32,
        userSelect: 'none',
      }}
    >
      <h1>{emoji}</h1>
    </div>
  );
};

export default Emoji;
