import { readFileSync } from 'fs';
import { join } from 'path';

export interface ComponentFile {
  path: string;
  type: 'component' | 'hook' | 'utility' | 'dependency';
  target: string;
}

export interface ComponentExample {
  name: string;
  code: string;
}

export interface ComponentMetadata {
  name: string;
  description: string;
  category: 'primitive' | 'structure' | 'hook';
  files: ComponentFile[];
  dependencies: string[];
  peerDependencies: string[];
  tags: string[];
  examples: ComponentExample[];
}

export interface Registry {
  name: string;
  version: string;
  description: string;
  components?: Record<string, ComponentMetadata>;
  primitives?: Record<string, any>;
  structures?: Record<string, any>;
  modules?: Record<string, any>;
  hooks?: Record<string, any>;
  providers?: Record<string, any>;
  [key: string]: any;
}

let cachedRegistry: Registry | null = null;

export function getRegistry(): Registry {
  if (cachedRegistry) {
    return cachedRegistry;
  }

  try {
    // Try to find registry.json from the UI package
    const registryPath = join(__dirname, '../../../ui/registry.json');
    const registryContent = readFileSync(registryPath, 'utf-8');
    cachedRegistry = JSON.parse(registryContent);
    return cachedRegistry!;
  } catch (error) {
    throw new Error(
      'Could not find or parse registry.json. Make sure the Acrobi UI package is installed.'
    );
  }
}

export function getComponent(name: string): ComponentMetadata | null {
  const allComponents = getAllComponents();
  return allComponents[name] || null;
}

export function getAllComponents(): Record<string, ComponentMetadata> {
  const registry = getRegistry();

  // Handle both old flat structure and new nested structure
  if (registry.components) {
    return registry.components;
  }

  // Handle the nested structure in the current registry
  const allComponents: Record<string, ComponentMetadata> = {};

  // Merge all categories into a flat structure
  const categories = [
    'primitives',
    'structures',
    'modules',
    'hooks',
    'providers',
  ];
  categories.forEach(category => {
    if (registry[category]) {
      Object.entries(registry[category]).forEach(
        ([key, component]: [string, any]) => {
          allComponents[key] = {
            name: component.name || key,
            description: component.description || '',
            category: category.slice(0, -1) as
              | 'primitive'
              | 'structure'
              | 'hook', // Remove 's' to match expected format
            files: component.files || [],
            dependencies: component.dependencies || [],
            peerDependencies: component.peerDependencies || [],
            tags: component.tags || [],
            examples: component.examples || [],
          };
        }
      );
    }
  });

  return allComponents;
}

export function getComponentsByCategory(
  category: string
): Record<string, ComponentMetadata> {
  const allComponents = getAllComponents();
  return Object.fromEntries(
    Object.entries(allComponents).filter(
      ([, component]) => component.category === category
    )
  );
}

export function getComponentsByTag(
  tag: string
): Record<string, ComponentMetadata> {
  const allComponents = getAllComponents();
  return Object.fromEntries(
    Object.entries(allComponents).filter(([, component]) =>
      component.tags.includes(tag)
    )
  );
}
