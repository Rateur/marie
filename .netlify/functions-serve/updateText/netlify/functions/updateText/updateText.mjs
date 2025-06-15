
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/updateText/updateText.mjs
import { neon } from "@netlify/neon";
var sql = neon();
var updateText_default = async (req, context) => {
  try {
    const { key, content } = await req.json();
    if (!key || !content) {
      return new Response(JSON.stringify({ error: "Missing key or content" }), { status: 400 });
    }
    await sql`UPDATE texts SET content = ${content} WHERE key = ${key}`;
    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
export {
  updateText_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvdXBkYXRlVGV4dC91cGRhdGVUZXh0Lm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgbmVvbiB9IGZyb20gJ0BuZXRsaWZ5L25lb24nO1xuXG5jb25zdCBzcWwgPSBuZW9uKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIGNvbnRleHQpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGtleSwgY29udGVudCB9ID0gYXdhaXQgcmVxLmpzb24oKTtcblxuICAgIGlmICgha2V5IHx8ICFjb250ZW50KSB7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiTWlzc2luZyBrZXkgb3IgY29udGVudFwiIH0pLCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGF3YWl0IHNxbGBVUERBVEUgdGV4dHMgU0VUIGNvbnRlbnQgPSAke2NvbnRlbnR9IFdIRVJFIGtleSA9ICR7a2V5fWA7XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSB9KSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyLm1lc3NhZ2UgfSksIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsU0FBUyxZQUFZO0FBRXJCLElBQU0sTUFBTSxLQUFLO0FBRWpCLElBQU8scUJBQVEsT0FBTyxLQUFLLFlBQVk7QUFDckMsTUFBSTtBQUNGLFVBQU0sRUFBRSxLQUFLLFFBQVEsSUFBSSxNQUFNLElBQUksS0FBSztBQUV4QyxRQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7QUFDcEIsYUFBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLEVBQUUsT0FBTyx5QkFBeUIsQ0FBQyxHQUFHLEVBQUUsUUFBUSxJQUFJLENBQUM7QUFBQSxJQUMxRjtBQUVBLFVBQU0saUNBQWlDLE9BQU8sZ0JBQWdCLEdBQUc7QUFFakUsV0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLEVBQUUsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQ3ZELFNBQVMsS0FBSztBQUNaLFdBQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxFQUFFLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsSUFBSSxDQUFDO0FBQUEsRUFDN0U7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
