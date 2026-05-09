export class PaginationHelper {
  static calculateTotalPages(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage);
  }

  static getPaginationInfo(
    page: number,
    limit: number,
    total: number
  ): { totalPages: number; hasNext: boolean; hasPrev: boolean } {
    const totalPages = this.calculateTotalPages(total, limit);
    return {
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }
}

export class ResponseHelper {
  static success<T>(data: T, message?: string) {
    return {
      success: true,
      data,
      message,
    };
  }

  static error(message: string, statusCode: number = 400) {
    return {
      success: false,
      error: message,
      statusCode,
    };
  }
}