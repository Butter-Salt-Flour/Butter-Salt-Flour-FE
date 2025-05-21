import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors } from './color';

const meta: Meta = {
  title: 'Design Tokens/Colors',
};

export default meta;
type Story = StoryObj;

export const Palette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {Object.entries(colors).map(([key, value]) =>
        typeof value === 'string' ? (
          <ColorBox key={key} name={key} color={value} />
        ) : (
          Object.entries(value).map(([subKey, hex]) => (
            <ColorBox
              key={`${key}-${subKey}`}
              name={`${key}-${subKey}`}
              color={hex}
            />
          ))
        )
      )}
    </div>
  ),
};

const ColorBox = ({ name, color }: { name: string; color: string }) => (
  <div style={{ textAlign: 'center', width: 100 }}>
    <div
      style={{
        width: 80,
        height: 80,
        backgroundColor: color,
        borderRadius: 8,
        border: '1px solid #ccc',
        margin: '0 auto',
      }}
    />
    <div style={{ fontSize: 12, marginTop: 4 }}>{name}</div>
    <code style={{ fontSize: 10 }}>{color}</code>
  </div>
);
