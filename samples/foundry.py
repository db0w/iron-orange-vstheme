"""Small foundry simulation used to preview Python highlighting."""
from dataclasses import dataclass, field
from typing import Iterable

MELTING_POINT = 1538  # °C, pure iron


@dataclass(frozen=True)
class Ingot:
    metal: str
    weight: float = 0.0
    tags: list[str] = field(default_factory=list)

    def __str__(self) -> str:
        return f"{self.metal} ingot ({self.weight:.2f} kg)"


class Furnace:
    def __init__(self, capacity: int = 500) -> None:
        self.capacity = capacity
        self._load: list[Ingot] = []

    @property
    def is_full(self) -> bool:
        return sum(i.weight for i in self._load) >= self.capacity

    async def smelt(self, ores: Iterable[str], temp: int = MELTING_POINT) -> list[Ingot]:
        if temp < MELTING_POINT and not self.is_full:
            raise ValueError(f"Too cold: {temp}°C")
        return [Ingot(ore, weight=12.5) for ore in ores if ore is not None]


if __name__ == "__main__":
    print(Furnace().is_full, True, None, r"\d+\n")
