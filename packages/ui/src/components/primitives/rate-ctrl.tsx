import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * RateCtrl (Rating Control) variant styles using authentic Acrobi classes
 * This matches the devlink RateCtrl component structure for star ratings
 */
const rateCtrlVariants = cva(
  // Base authentic Acrobi rating wrapper class
  'rating_wrap',
  {
    variants: {
      variant: {
        default: '',
        interactive: '',
        readonly: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Rating main container styling
const ratingMainVariants = cva('rating_main', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Rating point styling (individual star)
const ratingPointVariants = cva('rpoint', {
  variants: {
    state: {
      empty: '',
      half: '',
      filled: '',
      hover: '',
    },
  },
  defaultVariants: {
    state: 'empty',
  },
});

export interface RateCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rateCtrlVariants> {
  /**
   * Rating value (0-5)
   */
  value?: string | number;
  /**
   * Rating ID
   */
  rateId?: string;
  /**
   * Enable rate point 1
   */
  rate1?: boolean;
  /**
   * Rate point 1 state
   */
  rate1State?: string;
  /**
   * Rate point 1 hover handler
   */
  rate1Over?: React.HTMLAttributes<HTMLLabelElement>;
  /**
   * Enable rate point 2
   */
  rate2?: boolean;
  /**
   * Rate point 2 state
   */
  rate2State?: string;
  /**
   * Rate point 2 hover handler
   */
  rate2Over?: React.HTMLAttributes<HTMLLabelElement>;
  /**
   * Enable rate point 3
   */
  rate3?: boolean;
  /**
   * Rate point 3 state
   */
  rate3State?: string;
  /**
   * Rate point 3 hover handler
   */
  rate3Over?: React.HTMLAttributes<HTMLLabelElement>;
  /**
   * Enable rate point 4
   */
  rate4?: boolean;
  /**
   * Rate point 4 state
   */
  rate4State?: string;
  /**
   * Rate point 4 hover handler
   */
  rate4Over?: React.HTMLAttributes<HTMLLabelElement>;
  /**
   * Enable rate point 5
   */
  rate5?: boolean;
  /**
   * Rate point 5 state
   */
  rate5State?: string;
  /**
   * Rate point 5 hover handler
   */
  rate5Over?: React.HTMLAttributes<HTMLLabelElement>;
  /**
   * Modern API - Maximum rating (1-5)
   */
  maxRating?: number;
  /**
   * Modern API - Current rating value
   */
  rating?: number;
  /**
   * Modern API - Callback when rating changes
   */
  onRatingChange?: (rating: number) => void;
  /**
   * Modern API - Whether rating is interactive
   */
  interactive?: boolean;
  /**
   * Modern API - Show rating value as text
   */
  showValue?: boolean;
  /**
   * Modern API - Custom star icons
   */
  starIcon?: string;
  /**
   * Modern API - Star size
   */
  starSize?: 'sm' | 'md' | 'lg';
  /**
   * Component variant
   */
  variant?: 'default' | 'interactive' | 'readonly';
}

/**
 * Star SVG component for rating display
 */
const StarIcon: React.FC<{ filled?: boolean; className?: string }> = ({
  filled = false,
  className,
}) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? 'none' : 'currentColor'}
    strokeWidth={filled ? 0 : 1}
  >
    <path d='M23.971 8.33703C23.9368 8.23887 23.8729 8.15379 23.7881 8.09359C23.7034 8.03339 23.602 8.00104 23.498 8.00103H15.352L12.47 0.335027C12.4358 0.237131 12.372 0.152296 12.2874 0.0922707C12.2029 0.0322454 12.1017 0 11.998 0C11.8943 0 11.7932 0.0322454 11.7086 0.0922707C11.624 0.152296 11.5602 0.237131 11.526 0.335027L8.64402 8.00103H0.498022C0.394355 8.00164 0.293431 8.0344 0.209166 8.09479C0.1249 8.15518 0.0614432 8.24022 0.0275431 8.33819C-0.00635697 8.43616 -0.00903037 8.54223 0.0198914 8.64179C0.0488133 8.74134 0.107906 8.82947 0.189022 8.89403L6.91202 14.677L4.02302 23.343C3.98958 23.4437 3.989 23.5523 4.02137 23.6533C4.05374 23.7543 4.11737 23.8424 4.20308 23.9048C4.28879 23.9673 4.39214 24.0008 4.49818 24.0007C4.60423 24.0006 4.70748 23.9667 4.79302 23.904L11.998 18.621L19.203 23.904C19.2886 23.9667 19.3918 24.0006 19.4979 24.0007C19.6039 24.0008 19.7073 23.9673 19.793 23.9048C19.8787 23.8424 19.9423 23.7543 19.9747 23.6533C20.007 23.5523 20.0065 23.4437 19.973 23.343L17.084 14.677L23.807 8.89403C23.8889 8.8298 23.9488 8.74162 23.9782 8.64177C24.0076 8.54192 24.0051 8.43539 23.971 8.33703Z' />
  </svg>
);

/**
 * RateCtrl (Rating Control) component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink RateCtrl component.
 *
 * Key features:
 * - Uses .rating_wrap and .rating_main classes for authentic styling
 * - Uses .rpoint class for individual star styling
 * - Supports both devlink API (individual rate points) and modern API (rating value)
 * - Integrates with Finsweet star rating system via fs-starrating-element
 * - Supports interactive rating with hover effects and click handlers
 * - Displays current rating value with authentic styling
 *
 * @example
 * ```tsx
 * // Devlink API
 * <RateCtrl
 *   value={3}
 *   rate1={true}
 *   rate2={true}
 *   rate3={true}
 *   rate4={false}
 *   rate5={false}
 * />
 *
 * // Modern API
 * <RateCtrl
 *   rating={4}
 *   maxRating={5}
 *   interactive={true}
 *   showValue={true}
 *   onRatingChange={(rating) => console.log('Rating:', rating)}
 * />
 * ```
 */
const RateCtrl = React.forwardRef<HTMLDivElement, RateCtrlProps>(
  (
    {
      className,
      value = '0',
      rateId,
      rate1 = false,
      rate1State = 'Star',
      rate1Over = {},
      rate2 = false,
      rate2State = 'Star',
      rate2Over = {},
      rate3 = false,
      rate3State = 'Starh',
      rate3Over = {},
      rate4 = false,
      rate4State = 'Starh',
      rate4Over = {},
      rate5 = false,
      rate5State = 'Starh',
      rate5Over = {},
      // Modern API
      maxRating = 5,
      rating = 0,
      onRatingChange,
      interactive = false,
      showValue = true,
      starIcon,
      starSize = 'md',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [internalRating, setInternalRating] = React.useState(rating);
    const [hoverRating, setHoverRating] = React.useState(0);

    const currentRating = rating || internalRating;
    const displayRating = hoverRating || currentRating;

    // Determine if using modern API or devlink API
    const usingModernAPI =
      onRatingChange !== undefined || rating > 0 || maxRating !== 5;

    const handleStarClick = (starIndex: number) => {
      if (!interactive && !onRatingChange) return;

      const newRating = starIndex;
      setInternalRating(newRating);
      onRatingChange?.(newRating);
    };

    const handleStarHover = (starIndex: number) => {
      if (!interactive && !onRatingChange) return;
      setHoverRating(starIndex);
    };

    const handleMouseLeave = () => {
      setHoverRating(0);
    };

    // Render modern API version
    if (usingModernAPI) {
      return (
        <div
          ref={ref}
          className={cn(rateCtrlVariants({ variant }), className)}
          id={rateId}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          <div
            className={cn(ratingMainVariants({ size: starSize }))}
            fs-starrating-element='group'
          >
            {Array.from({ length: maxRating }, (_, index) => {
              const starIndex = index + 1;
              const isFilled = starIndex <= displayRating;

              return (
                <div
                  key={starIndex}
                  className={cn(
                    ratingPointVariants({
                      state: isFilled ? 'filled' : 'empty',
                    })
                  )}
                >
                  <input
                    type='radio'
                    name='rating'
                    value={starIndex}
                    className='rating_rdobtn sr-only'
                    checked={starIndex === currentRating}
                    onChange={() => handleStarClick(starIndex)}
                    disabled={!interactive && !onRatingChange}
                  />
                  <div
                    className='rating_bg'
                    fs-starrating-element='star'
                    onMouseEnter={() => handleStarHover(starIndex)}
                    onClick={() => handleStarClick(starIndex)}
                    style={{
                      cursor:
                        interactive || onRatingChange ? 'pointer' : 'default',
                    }}
                  >
                    <StarIcon filled={isFilled} className='w-6 h-6' />
                  </div>
                </div>
              );
            })}
          </div>

          {showValue && (
            <div className='label_wrap' data-lbl-size='r3'>
              {displayRating > 0 ? displayRating : value}
            </div>
          )}
        </div>
      );
    }

    // Render devlink API version
    return (
      <div
        ref={ref}
        className={cn(rateCtrlVariants({ variant }), className)}
        id={rateId}
        {...props}
      >
        <div className={cn(ratingMainVariants())} fs-starrating-element='group'>
          {/* Star 1 */}
          <div className={cn(ratingPointVariants())}>
            <input
              type='radio'
              name='Rating'
              value='1'
              className='rating_rdobtn sr-only'
              id='Star-rating-1-1'
            />
            <div className='rating_bg' fs-starrating-element='star'>
              <StarIcon filled={rate1} className='w-6 h-6' />
            </div>
            {rate1 && (
              <label
                className='rating_on'
                data-lbl-size='h3'
                htmlFor='Star-rating-1-1'
                {...rate1Over}
              >
                {rate1State}
              </label>
            )}
          </div>

          {/* Star 2 */}
          <div className={cn(ratingPointVariants())}>
            <input
              type='radio'
              name='Rating'
              value='2'
              className='rating_rdobtn sr-only'
              id='Star-rating-2-2'
            />
            <div className='rating_bg' fs-starrating-element='star'>
              <StarIcon filled={rate2} className='w-6 h-6' />
            </div>
            {rate2 && (
              <label
                className='rating_on'
                data-lbl-size='h3'
                htmlFor='Star-rating-2-2'
                {...rate2Over}
              >
                {rate2State}
              </label>
            )}
          </div>

          {/* Star 3 */}
          <div className={cn(ratingPointVariants())}>
            <input
              type='radio'
              name='Rating'
              value='3'
              className='rating_rdobtn sr-only'
              id='Star-rating-3-3'
            />
            <div className='rating_bg' fs-starrating-element='star'>
              <StarIcon filled={rate3} className='w-6 h-6' />
            </div>
            {rate3 && (
              <label
                className='rating_on'
                data-lbl-size='h3'
                htmlFor='Star-rating-3-3'
                {...rate3Over}
              >
                {rate3State}
              </label>
            )}
          </div>

          {/* Star 4 */}
          <div className={cn(ratingPointVariants())}>
            <input
              type='radio'
              name='Rating'
              value='4'
              className='rating_rdobtn sr-only'
              id='Star-rating-4-4'
            />
            <div className='rating_bg' fs-starrating-element='star'>
              <StarIcon filled={rate4} className='w-6 h-6' />
            </div>
            {rate4 && (
              <label
                className='rating_on'
                data-lbl-size='h3'
                htmlFor='Star-rating-4-4'
                {...rate4Over}
              >
                {rate4State}
              </label>
            )}
          </div>

          {/* Star 5 */}
          <div className={cn(ratingPointVariants())}>
            <input
              type='radio'
              name='Rating'
              value='5'
              className='rating_rdobtn sr-only'
              id='Star-rating-5-5'
            />
            <div className='rating_bg' fs-starrating-element='star'>
              <StarIcon filled={rate5} className='w-6 h-6' />
            </div>
            {rate5 && (
              <label
                className='rating_on'
                data-lbl-size='h3'
                htmlFor='Star-rating-5-5'
                {...rate5Over}
              >
                {rate5State}
              </label>
            )}
          </div>
        </div>

        <div className='label_wrap' data-lbl-size='r3'>
          {value}
        </div>
      </div>
    );
  }
);

RateCtrl.displayName = 'RateCtrl';

export { RateCtrl, rateCtrlVariants, ratingMainVariants, ratingPointVariants };
