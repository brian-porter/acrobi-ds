/**
 * Hybrid App Example
 * Demonstrates using Acrobi components + Tailwind utilities in perfect harmony
 * 
 * This example shows:
 * 1. Your Acrobi components with semantic props (styling="pf", size="m")
 * 2. Tailwind utilities that automatically respect the active theme
 * 3. Theme switching that affects both component and utility styles
 */

import React, { useState } from 'react';
import { Button } from '../components/primitives/button';

// Mock components for demonstration (replace with your actual components)
const Card = ({ children, className = '', ...props }) => (
  <div className={`card-semantic ${className}`} {...props}>
    {children}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input className={`input-semantic ${className}`} {...props} />
);

const Label = ({ children, className = '', ...props }) => (
  <label className={`text-sm font-medium text-foreground ${className}`} {...props}>
    {children}
  </label>
);

export const HybridAppExample: React.FC = () => {
  const [theme, setTheme] = useState<'acrobi' | 'bluequeue'>('acrobi');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleThemeSwitch = () => {
    setTheme(theme === 'acrobi' ? 'bluequeue' : 'acrobi');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted with theme: ${theme}`);
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-background p-4 transition-colors duration-300">
      {/* Header with theme switcher */}
      <header className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Hybrid App Example
          </h1>
          <p className="text-muted-foreground mt-1">
            Acrobi components + Tailwind utilities working together
          </p>
        </div>
        
        {/* Theme switcher using your Button component */}
        <Button
          styling="pl"  {/* Your semantic prop system */}
          size="m"
          onClick={handleThemeSwitch}
        >
          {theme === 'acrobi' ? '🔵 Switch to BlueQueue' : '⚪ Switch to Acrobi'}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Product Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Product Showcase
          </h2>
          
          {/* Product Card 1 */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary text-2xl">📱</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Premium App
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Advanced features with seamless integration and premium support.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">$99</span>
                  <div className="flex space-x-2">
                    {/* Your component with semantic props */}
                    <Button styling="pt" size="sm">
                      Learn More
                    </Button>
                    {/* Your component - primary filled */}
                    <Button styling="pf" size="sm">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Product Card 2 */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground text-2xl">⚡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Starter Kit
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Everything you need to get started with our platform.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">Free</span>
                  <div className="flex space-x-2">
                    {/* Your component - neutral line */}
                    <Button styling="nl" size="sm">
                      Documentation
                    </Button>
                    {/* Your component - primary filled */}
                    <Button styling="pf" size="sm">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Status Cards using Tailwind utilities */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
              <div className="text-success text-2xl mb-2">✅</div>
              <div className="text-sm font-medium text-success">Active</div>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
              <div className="text-warning text-2xl mb-2">⚠️</div>
              <div className="text-sm font-medium text-warning">Pending</div>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
              <div className="text-destructive text-2xl mb-2">❌</div>
              <div className="text-sm font-medium text-destructive">Error</div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Contact Form
          </h2>
          
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-semantic mt-1 w-full resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                {/* Your components with semantic props */}
                <Button
                  styling="nl"  {/* neutral line */}
                  size="m"
                  htmlType="button"
                  onClick={() => setFormData({ name: '', email: '', message: '' })}
                >
                  Clear Form
                </Button>
                <Button
                  styling="pf"  {/* primary filled */}
                  size="m"
                  htmlType="submit"
                  className="flex-1"  {/* Tailwind utility mixed in */}
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Card>

          {/* Theme Information Card */}
          <Card className="p-6 bg-accent/5 border-accent/20">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Current Theme: {theme}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Color:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary rounded border border-border"></div>
                  <code className="text-primary">var(--primary)</code>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Background:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-background border border-border rounded"></div>
                  <code className="text-foreground">var(--background)</code>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accent Color:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-accent rounded border border-border"></div>
                  <code className="text-accent">var(--accent)</code>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              All colors automatically switch with the theme. Both Acrobi components 
              and Tailwind utilities respect the same semantic variables.
            </p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              This example demonstrates perfect integration between:
            </p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              <li>• Acrobi components with <code>styling="pf"</code> props</li>
              <li>• Tailwind utilities like <code>bg-primary</code> and <code>text-foreground</code></li>
              <li>• Automatic theme switching affecting both systems</li>
            </ul>
          </div>
          
          <div className="flex space-x-2">
            {/* Button size demonstration */}
            <Button styling="pt" size="xs">XS</Button>
            <Button styling="pt" size="sm">SM</Button>
            <Button styling="pt" size="m">MD</Button>
            <Button styling="pt" size="l">LG</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HybridAppExample;