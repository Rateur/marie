
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/getTexts/getTexts.mjs
import { neon } from "@netlify/neon";
var sql = neon();
var getTexts_default = async (req, context) => {
  try {
    const rows = await sql`SELECT * FROM texts`;
    return Response.json(rows);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
export {
  getTexts_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvZ2V0VGV4dHMvZ2V0VGV4dHMubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBuZW9uIH0gZnJvbSAnQG5ldGxpZnkvbmVvbic7XG5cbmNvbnN0IHNxbCA9IG5lb24oKTsgLy8gdXRpbGlzZSBhdXRvbWF0aXF1ZW1lbnQgbGEgdmFyaWFibGUgTkVUTElGWV9EQVRBQkFTRV9VUkxcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgY29udGV4dCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJvd3MgPSBhd2FpdCBzcWxgU0VMRUNUICogRlJPTSB0ZXh0c2A7XG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24ocm93cyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyLm1lc3NhZ2UgfSksIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsU0FBUyxZQUFZO0FBRXJCLElBQU0sTUFBTSxLQUFLO0FBRWpCLElBQU8sbUJBQVEsT0FBTyxLQUFLLFlBQVk7QUFDckMsTUFBSTtBQUNGLFVBQU0sT0FBTyxNQUFNO0FBQ25CLFdBQU8sU0FBUyxLQUFLLElBQUk7QUFBQSxFQUMzQixTQUFTLEtBQUs7QUFDWixXQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsRUFBRSxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLElBQUksQ0FBQztBQUFBLEVBQzdFO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
