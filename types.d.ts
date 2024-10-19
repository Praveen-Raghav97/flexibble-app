// types.d.ts or a new file in your project
declare global {
    var mongoose: {
      conn: typeof import("mongoose") | null;
      promise: Promise<typeof import("mongoose")> | null;
    };
  }
  
  // To make sure the file is treated as a module
  export {};
  