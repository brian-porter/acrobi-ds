import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegBtnCtrl } from './seg-btn-ctrl';
import { useState } from 'react';

const meta: Meta<typeof SegBtnCtrl> = {
  title: 'Primitives/SegBtnCtrl',
  component: SegBtnCtrl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='p-6'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    segBtn: {
      control: { type: 'boolean' },
      description: 'Segmented button control visibility toggle',
    },
    segBtnClr: {
      control: { type: 'text' },
      description: 'Segmented button color scheme',
    },
    btn1: {
      control: { type: 'boolean' },
      description: 'Show button 1',
    },
    btn2: {
      control: { type: 'boolean' },
      description: 'Show button 2',
    },
    btn3: {
      control: { type: 'boolean' },
      description: 'Show button 3',
    },
    btn4: {
      control: { type: 'boolean' },
      description: 'Show button 4',
    },
    btn5: {
      control: { type: 'boolean' },
      description: 'Show button 5',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost', 'separated'],
      description: 'Component variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    segBtn: true,
    btn1: true,
    btn1Btn1Txt: true,
    btn1Btn1Icn: false,
    btn1Btn1TxtSrc: 'All',
    btn1Btn1Actv: 'false',
    btn2: true,
    btn2Btn2Txt: true,
    btn2Btn2Icn: false,
    btn2Btn2TxtSrc: 'Photos',
    btn2Btn2Actv: 'true',
    btn3: true,
    btn3Btn3Txt: true,
    btn3Btn3Icn: false,
    btn3Btn3TxtSrc: 'Videos',
    btn3Btn3Actv: 'false',
    btn4: false,
    btn5: false,
  },
};

export const IconOnly: Story = {
  args: {
    segBtn: true,
    btn1: true,
    btn1Btn1Txt: false,
    btn1Btn1Icn: true,
    btn1Btn1IcnSrc: 'apps',
    btn1Btn1Actv: 'true',
    btn2: true,
    btn2Btn2Txt: false,
    btn2Btn2Icn: true,
    btn2Btn2IcnSrc: 'image',
    btn2Btn2Actv: 'false',
    btn3: true,
    btn3Btn3Txt: false,
    btn3Btn3Icn: true,
    btn3Btn3IcnSrc: 'video',
    btn3Btn3Actv: 'false',
    btn4: true,
    btn4Btn4Txt: false,
    btn4Btn4Icn: true,
    btn4Btn4IcnSrc: 'music',
    btn4Btn4Actv: 'false',
    btn5: false,
  },
};

export const IconAndText: Story = {
  args: {
    segBtn: true,
    btn1: true,
    btn1Btn1Txt: true,
    btn1Btn1Icn: true,
    btn1Btn1TxtSrc: 'Gallery',
    btn1Btn1IcnSrc: 'apps',
    btn1Btn1Actv: 'false',
    btn2: true,
    btn2Btn2Txt: true,
    btn2Btn2Icn: true,
    btn2Btn2TxtSrc: 'Photos',
    btn2Btn2IcnSrc: 'image',
    btn2Btn2Actv: 'true',
    btn3: true,
    btn3Btn3Txt: true,
    btn3Btn3Icn: true,
    btn3Btn3TxtSrc: 'Videos',
    btn3Btn3IcnSrc: 'video',
    btn3Btn3Actv: 'false',
    btn4: false,
    btn5: false,
  },
};

export const FiveButtons: Story = {
  args: {
    segBtn: true,
    btn1: true,
    btn1Btn1Txt: true,
    btn1Btn1Icn: false,
    btn1Btn1TxtSrc: 'Home',
    btn1Btn1Actv: 'true',
    btn2: true,
    btn2Btn2Txt: true,
    btn2Btn2Icn: false,
    btn2Btn2TxtSrc: 'Search',
    btn2Btn2Actv: 'false',
    btn3: true,
    btn3Btn3Txt: true,
    btn3Btn3Icn: false,
    btn3Btn3TxtSrc: 'Explore',
    btn3Btn3Actv: 'false',
    btn4: true,
    btn4Btn4Txt: true,
    btn4Btn4Icn: false,
    btn4Btn4TxtSrc: 'Library',
    btn4Btn4Actv: 'false',
    btn5: true,
    btn5Btn5Txt: true,
    btn5Btn5Icn: false,
    btn5Btn5TxtSrc: 'Profile',
    btn5Btn5Actv: 'false',
  },
};

export const ModernAPI: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(1);

    const items = [
      { textSrc: 'All', showText: true, showIcon: false },
      { textSrc: 'Photos', showText: true, showIcon: false },
      { textSrc: 'Videos', showText: true, showIcon: false },
      { textSrc: 'Music', showText: true, showIcon: false },
    ];

    return (
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Modern API with State</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Active index: {activeIndex} - "{items[activeIndex]?.textSrc}"
          </p>

          <SegBtnCtrl
            items={items}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />
        </div>
      </div>
    );
  },
};

export const FilterExample: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState(0);

    const filters = [
      { textSrc: 'All', showText: true, showIcon: false },
      { iconSrc: 'image', showText: false, showIcon: true },
      { iconSrc: 'video', showText: false, showIcon: true },
      { iconSrc: 'bookmark', showText: false, showIcon: true },
    ];

    const filterNames = ['All Items', 'Images', 'Videos', 'Bookmarks'];

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Content Filter</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Showing: {filterNames[activeFilter]}
          </p>

          <SegBtnCtrl
            items={filters}
            activeIndex={activeFilter}
            onActiveChange={setActiveFilter}
          />
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <h4 className='font-medium text-gray-800 mb-2'>Content Area</h4>
          <div className='grid grid-cols-3 gap-2'>
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className='h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600'
              >
                {filterNames[activeFilter]} {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const NavigationTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
      {
        textSrc: 'Overview',
        iconSrc: 'dashboard',
        showText: true,
        showIcon: true,
      },
      {
        textSrc: 'Analytics',
        iconSrc: 'chart',
        showText: true,
        showIcon: true,
      },
      { textSrc: 'Reports', iconSrc: 'report', showText: true, showIcon: true },
      {
        textSrc: 'Settings',
        iconSrc: 'settings',
        showText: true,
        showIcon: true,
      },
    ];

    const tabContent = [
      'Overview dashboard with key metrics and summaries.',
      'Detailed analytics with charts and graphs.',
      'Generated reports and data exports.',
      'Application settings and preferences.',
    ];

    return (
      <div className='w-full max-w-2xl'>
        <div className='border border-gray-200 rounded-lg overflow-hidden'>
          <div className='bg-gray-50 p-4 border-b border-gray-200'>
            <SegBtnCtrl
              items={tabs}
              activeIndex={activeTab}
              onActiveChange={setActiveTab}
            />
          </div>

          <div className='p-6'>
            <h3 className='text-lg font-semibold mb-2'>
              {tabs[activeTab].textSrc}
            </h3>
            <p className='text-gray-600'>{tabContent[activeTab]}</p>

            <div className='mt-4 grid grid-cols-2 gap-4'>
              <div className='h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500'>
                Content Block 1
              </div>
              <div className='h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500'>
                Content Block 2
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const handleButtonClick = (buttonName: string, isActive: boolean) => {
      console.log(`Button "${buttonName}" clicked. Active: ${isActive}`);
    };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Interactive Example</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Open the browser console to see click events.
          </p>

          <SegBtnCtrl
            btn1={true}
            btn1Btn1Txt={true}
            btn1Btn1TxtSrc='Draft'
            btn1Btn1Actv='false'
            btn1Btn1Click={{ onClick: () => handleButtonClick('Draft', false) }}
            btn2={true}
            btn2Btn2Txt={true}
            btn2Btn2TxtSrc='Published'
            btn2Btn2Actv='true'
            btn2Btn2Click={{
              onClick: () => handleButtonClick('Published', true),
            }}
            btn3={true}
            btn3Btn3Txt={true}
            btn3Btn3TxtSrc='Archived'
            btn3Btn3Actv='false'
            btn3Btn3Click={{
              onClick: () => handleButtonClick('Archived', false),
            }}
          />
        </div>
      </div>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-3'>Text Only (3 buttons)</h3>
        <SegBtnCtrl
          btn1Btn1TxtSrc='Home'
          btn1Btn1Icn={false}
          btn1Btn1Actv='true'
          btn2Btn2TxtSrc='About'
          btn2Btn2Icn={false}
          btn3Btn3TxtSrc='Contact'
          btn3Btn3Icn={false}
          btn4={false}
          btn5={false}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Icons Only (4 buttons)</h3>
        <SegBtnCtrl
          btn1Btn1Txt={false}
          btn1Btn1IcnSrc='home'
          btn1Btn1Actv='false'
          btn2Btn2Txt={false}
          btn2Btn2IcnSrc='search'
          btn2Btn2Actv='true'
          btn3Btn3Txt={false}
          btn3Btn3IcnSrc='notification'
          btn3Btn3Actv='false'
          btn4={true}
          btn4Btn4Txt={false}
          btn4Btn4IcnSrc='user'
          btn4Btn4Actv='false'
          btn5={false}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>
          Mixed Content (5 buttons)
        </h3>
        <SegBtnCtrl
          btn1Btn1TxtSrc='All'
          btn1Btn1IcnSrc='apps'
          btn1Btn1Actv='false'
          btn2Btn2Txt={false}
          btn2Btn2IcnSrc='image'
          btn2Btn2Actv='true'
          btn3Btn3Txt={false}
          btn3Btn3IcnSrc='video'
          btn3Btn3Actv='false'
          btn4={true}
          btn4Btn4TxtSrc='Music'
          btn4Btn4Icn={false}
          btn4Btn4Actv='false'
          btn5={true}
          btn5Btn5TxtSrc='Other'
          btn5Btn5Icn={false}
          btn5Btn5Actv='false'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Modern Items API</h3>
        <SegBtnCtrl
          items={[
            {
              textSrc: 'Dashboard',
              iconSrc: 'dashboard',
              showText: true,
              showIcon: true,
              active: true,
            },
            {
              textSrc: 'Analytics',
              iconSrc: 'chart',
              showText: true,
              showIcon: true,
              active: false,
            },
            {
              textSrc: 'Settings',
              iconSrc: 'settings',
              showText: true,
              showIcon: true,
              active: false,
            },
          ]}
        />
      </div>
    </div>
  ),
};
