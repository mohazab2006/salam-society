import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, beforeEach, describe, it, expect } from "vitest";
import AdminEventActions from "@/components/admin/AdminEventActions";

const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

const mockDeleteRecord = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/actions", () => ({
  deleteRecord: (...args: unknown[]) => mockDeleteRecord(...args),
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockDeleteRecord.mockResolvedValue(undefined);
});

describe("AdminEventActions", () => {
  it("renders Edit and Delete buttons", () => {
    render(<AdminEventActions id="123" />);
    expect(screen.getByRole("link", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("first click shows Confirm? button", async () => {
    const user = userEvent.setup();
    render(<AdminEventActions id="123" />);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("button", { name: "Confirm?" })).toBeInTheDocument();
  });

  it("shows Cancel button after first click", async () => {
    const user = userEvent.setup();
    render(<AdminEventActions id="123" />);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("cancel resets to Delete", async () => {
    const user = userEvent.setup();
    render(<AdminEventActions id="123" />);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
  });

  it("confirms delete calls deleteRecord with correct table and id", async () => {
    const user = userEvent.setup();
    const tables = ["events", "programs", "media", "partners"];

    for (const table of tables) {
      vi.clearAllMocks();
      mockDeleteRecord.mockResolvedValue(undefined);

      const { unmount } = render(<AdminEventActions id="test-id" table={table} />);
      await user.click(screen.getByRole("button", { name: "Delete" }));
      await user.click(screen.getByRole("button", { name: "Confirm?" }));

      await waitFor(() => {
        expect(mockDeleteRecord).toHaveBeenCalledWith(table, "test-id");
      });

      unmount();
    }
  });

  it("deleteRecord called with default table 'events' when no table prop", async () => {
    const user = userEvent.setup();
    render(<AdminEventActions id="abc" />);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Confirm?" }));

    await waitFor(() => {
      expect(mockDeleteRecord).toHaveBeenCalledWith("events", "abc");
    });
  });

  it("calls router.refresh after successful delete", async () => {
    const user = userEvent.setup();
    render(<AdminEventActions id="abc" />);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Confirm?" }));

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it("shows deleting state (…) while waiting", async () => {
    const user = userEvent.setup();
    let resolveDelete!: () => void;
    mockDeleteRecord.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveDelete = resolve;
      })
    );

    render(<AdminEventActions id="abc" />);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Confirm?" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "…" })).toBeInTheDocument();
    });

    // Clean up by resolving the promise
    resolveDelete();
  });
});
