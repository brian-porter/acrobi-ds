import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ObjGrp } from '../obj-grp';

describe('ObjGrp', () => {
  it('renders with default props', () => {
    render(<ObjGrp data-testid='obj-grp' />);

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toBeInTheDocument();
    expect(objGrp).toHaveClass('objgrp_wrap');
    expect(objGrp).toHaveAttribute('data-grp-sz', 'm');
    expect(objGrp).toHaveAttribute('data-grp-shp', 'c');
    expect(objGrp).toHaveAttribute('data-overlap', 'true');
  });

  it('renders with custom size and shape', () => {
    render(<ObjGrp size='l' shape='s' data-testid='obj-grp' />);

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toHaveAttribute('data-grp-sz', 'l');
    expect(objGrp).toHaveAttribute('data-grp-shp', 's');
  });

  it('does not render when visible is false', () => {
    render(<ObjGrp visible={false} data-testid='obj-grp' />);

    expect(screen.queryByTestId('obj-grp')).not.toBeInTheDocument();
  });

  it('renders avatar objects', () => {
    render(
      <ObjGrp
        obj1Src='https://example.com/avatar1.jpg'
        obj1Type='avatar'
        obj2Src='https://example.com/avatar2.jpg'
        obj2Type='avatar'
        data-testid='obj-grp'
      />
    );

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toBeInTheDocument();
    expect(objGrp).toHaveAttribute('data-obj-count', '2');

    // Check for avatar wrapper classes
    const avatarWrappers = objGrp.querySelectorAll('.avtr_wrap');
    expect(avatarWrappers).toHaveLength(2);
  });

  it('renders icon objects', () => {
    render(
      <ObjGrp
        obj1Src='star'
        obj1Type='icon'
        obj2Src='heart'
        obj2Type='icon'
        data-testid='obj-grp'
      />
    );

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toHaveAttribute('data-obj-count', '2');
  });

  it('renders image objects', () => {
    render(
      <ObjGrp
        obj1Src='https://example.com/image1.jpg'
        obj1Type='image'
        obj2Src='https://example.com/image2.jpg'
        obj2Type='image'
        data-testid='obj-grp'
      />
    );

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toHaveAttribute('data-obj-count', '2');

    // Check for image elements
    const images = objGrp.querySelectorAll('.objgrp-img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/image2.jpg');
  });

  it('renders mixed content types', () => {
    render(
      <ObjGrp
        obj1Src='https://example.com/avatar.jpg'
        obj1Type='avatar'
        obj2Src='star'
        obj2Type='icon'
        obj3Src='https://example.com/image.jpg'
        obj3Type='image'
        data-testid='obj-grp'
      />
    );

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toHaveAttribute('data-obj-count', '3');

    // Check for mixed content
    expect(objGrp.querySelector('.avtr_wrap')).toBeInTheDocument();
    expect(objGrp.querySelector('.objgrp-img')).toBeInTheDocument();
  });

  it('limits visible objects and shows remaining count', () => {
    render(
      <ObjGrp
        obj1Src='https://example.com/avatar1.jpg'
        obj1Type='avatar'
        obj2Src='https://example.com/avatar2.jpg'
        obj2Type='avatar'
        obj3Src='https://example.com/avatar3.jpg'
        obj3Type='avatar'
        obj4Src='https://example.com/avatar4.jpg'
        obj4Type='avatar'
        obj5Src='https://example.com/avatar5.jpg'
        obj5Type='avatar'
        maxVisible={3}
        showRemainingCount={true}
        data-testid='obj-grp'
      />
    );

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toHaveAttribute('data-obj-count', '3');

    // Check for remaining count indicator
    const remainingIndicator = objGrp.querySelector('.objgrp-remaining');
    expect(remainingIndicator).toBeInTheDocument();
    expect(remainingIndicator).toHaveAttribute('data-remaining-count', '2');
    expect(remainingIndicator).toHaveTextContent('+2');
  });

  it('does not show remaining count when showRemainingCount is false', () => {
    render(
      <ObjGrp
        obj1Src='https://example.com/avatar1.jpg'
        obj1Type='avatar'
        obj2Src='https://example.com/avatar2.jpg'
        obj2Type='avatar'
        obj3Src='https://example.com/avatar3.jpg'
        obj3Type='avatar'
        obj4Src='https://example.com/avatar4.jpg'
        obj4Type='avatar'
        maxVisible={2}
        showRemainingCount={false}
        data-testid='obj-grp'
      />
    );

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toHaveAttribute('data-obj-count', '2');

    // Should not show remaining count
    const remainingIndicator = objGrp.querySelector('.objgrp-remaining');
    expect(remainingIndicator).not.toBeInTheDocument();
  });

  it('ignores empty object sources', () => {
    render(
      <ObjGrp
        obj1Src='https://example.com/avatar1.jpg'
        obj1Type='avatar'
        obj2Src=''
        obj2Type='avatar'
        obj3Src={undefined}
        obj3Type='avatar'
        obj4Src='https://example.com/avatar2.jpg'
        obj4Type='avatar'
        data-testid='obj-grp'
      />
    );

    const objGrp = screen.getByTestId('obj-grp');
    // Should only count non-empty sources
    expect(objGrp).toHaveAttribute('data-obj-count', '2');
  });

  it('applies custom className', () => {
    render(<ObjGrp className='custom-class' data-testid='obj-grp' />);

    const objGrp = screen.getByTestId('obj-grp');
    expect(objGrp).toHaveClass('custom-class');
    expect(objGrp).toHaveClass('objgrp_wrap');
  });

  it('supports all size variants', () => {
    const sizes = ['xs', 's', 'm', 'l'] as const;

    sizes.forEach(size => {
      const { unmount } = render(
        <ObjGrp size={size} data-testid={`obj-grp-${size}`} />
      );

      const objGrp = screen.getByTestId(`obj-grp-${size}`);
      expect(objGrp).toHaveAttribute('data-grp-sz', size);

      unmount();
    });
  });

  it('supports all shape variants', () => {
    const shapes = ['c', 's', 'r', 'b'] as const;

    shapes.forEach(shape => {
      const { unmount } = render(
        <ObjGrp shape={shape} data-testid={`obj-grp-${shape}`} />
      );

      const objGrp = screen.getByTestId(`obj-grp-${shape}`);
      expect(objGrp).toHaveAttribute('data-grp-shp', shape);

      unmount();
    });
  });
});
