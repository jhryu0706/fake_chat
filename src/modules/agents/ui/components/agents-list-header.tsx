"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, RotateCcwIcon } from "lucide-react";
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";

export const AgentListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <AgentsSearchFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilters}>
                <RotateCcwIcon />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar />
        </ScrollArea>
      </div>
    </>
  );
};
