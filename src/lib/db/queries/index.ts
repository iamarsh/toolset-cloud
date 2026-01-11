/**
 * Database Query Layer - Barrel Export
 *
 * Centralized exports for all database query functions.
 * Import from '@/lib/db/queries' instead of individual files.
 *
 * @example
 * import { getRecentToolRuns, createToolConfig, getUserPreferences } from '@/lib/db/queries'
 */

// Tool Runs
export {
  createToolRun,
  getToolRun,
  getRecentToolRuns,
  getToolRunsByTool,
  getToolRunHistory,
  getToolRunStats,
  updateToolRun,
  deleteToolRun,
  deleteAllToolRuns,
  hasToolRunHistory,
  searchToolRuns,
} from './tool-runs'

// Tool Configs
export {
  createToolConfig,
  getToolConfig,
  getToolConfigsByTool,
  getAllToolConfigs,
  getFavoriteToolConfigs,
  updateToolConfig,
  toggleFavorite,
  deleteToolConfig,
  deleteToolConfigsByTool,
  configNameExists,
  getToolConfigCount,
  getRecentToolConfigs,
  searchToolConfigs,
  duplicateToolConfig,
} from './tool-configs'

// User Preferences
export {
  getUserPreferences,
  createUserPreferences,
  updateUserPreferences,
  updateTheme,
  updateRecentToolsLimit,
  toggleEmailNotifications,
  deleteUserPreferences,
  resetUserPreferences,
  hasUserPreferences,
  ensureUserPreferences,
  bulkUpdatePreferences,
  getUserPreferencesBulk,
  getPreferenceStats,
} from './user-preferences'
