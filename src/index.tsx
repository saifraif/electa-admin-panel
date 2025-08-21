// src/index.tsx (very top, before ReactDOM.render/createRoot)
import { migrateTokenKey } from "./bootstrap/migrateToken";
migrateTokenKey();
