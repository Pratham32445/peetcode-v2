import React from "react";
import Editor from "../Editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Output from "./Output";

const IntrviewOneToOne = () => {
  return (
    <div className="w-full min-h-screen flex">
      <div className="w-full min-h-full flex">
        <div className="relative w-3/4  h-full flex">
          <ResizablePanelGroup direction="horizontal" className="w-full border">
            <ResizablePanel defaultSize={60}>
              <div className="w-full h-full">
                <Editor />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <Output />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="w-1/4 h-full">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default IntrviewOneToOne;
