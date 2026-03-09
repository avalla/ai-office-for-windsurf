#!/usr/bin/env bun

/**
 * Initialize .ai-agency folder structure in a project
 * Usage: bun init.js [project-name] OR node init.js [project-name]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2] || 'new-project';

const structure = {
  tasks: {
    'BACKLOG': [],
    'TODO': [],
    'WIP': [],
    'REVIEW': [],
    'REJECTED': [],
    'DONE': [],
    'ARCHIVED': []
  },
  architecture: {
    decisions: [],
    diagrams: []
  },
  docs: {
    prd: [],
    qa: [],
    runbooks: [],
    api: [],
    guides: []
  },
  memory: {
    patterns: [],
    insights: [],
    decisions: [],
    knowledge: []
  }
};

function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
}

function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  }
}

function initializeAgencyFolder(basePath) {
  // If we're already in .ai-agency directory, go up one level
  if (basePath.endsWith('.ai-agency')) {
    basePath = path.dirname(basePath);
  }

  const agencyPath = path.join(basePath, '.ai-agency');

  // Create main folder
  createDirectory(agencyPath);

  // Create subdirectories
  Object.entries(structure).forEach(([key, subdirs]) => {
    const mainDir = path.join(agencyPath, key);
    createDirectory(mainDir);

    if (typeof subdirs === 'object') {
      Object.entries(subdirs).forEach(([subkey, files]) => {
        if (subkey !== 'README.md') {
          createDirectory(path.join(mainDir, subkey));
        }
      });
    }
  });

  // Update config.json with project name
  const configPath = path.join(agencyPath, 'config.json');
  let config;

  try {
    // Read config as JSON
    const configData = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configData);
  } catch (error) {
    console.error('Error reading config.json:', error);
    return;
  }

  config.project.name = projectName;
  config.project.created = new Date().toISOString().split('T')[0];
  config.project.updated = config.project.created;

  // Add Bun to tech stack if not present
  if (!config.project.tech_stack) {
    config.project.tech_stack = [];
  }
  if (!config.project.tech_stack.includes('bun')) {
    config.project.tech_stack.push('bun');
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`Updated: ${configPath}`);

  console.log(`\n✅ .ai-agency folder initialized for project: ${projectName}`);
  console.log(`📁 Location: ${agencyPath}`);
  console.log(`⚡ Runtime: Bun detected and added to tech stack`);
  console.log(`\nNext steps:`);
  console.log(`1. Review the folder structure`);
  console.log(`2. Create your first task in tasks/TODO/`);
  console.log(`3. Add architecture documentation`);
  console.log(`4. Start building your project memory`);
  console.log(`5. Use 'bun .ai-agency/cli.js' for faster execution`);
}

// Initialize in current directory
initializeAgencyFolder(process.cwd());
