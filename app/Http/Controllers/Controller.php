<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Str;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected string $modelClass;

    protected string $routePrefix;

    protected string $viewPrefix;

    protected array $validationRules = [];

    protected array $filterableFields = [];

    protected int $perPage = 15;

    protected function successResponse($data = null, string $message = 'Success', int $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    protected function errorResponse(string $message = 'Error', int $code = 400, $errors = null)
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }

    protected function paginate($collection, $perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        $page = request()->get('page', 1);
        $offset = ($page - 1) * $perPage;

        $data = $collection->slice($offset, $perPage)->values();

        return [
            'data' => $data,
            'meta' => [
                'current_page' => (int) $page,
                'per_page' => $perPage,
                'total' => $collection->count(),
                'last_page' => ceil($collection->count() / $perPage),
            ],
        ];
    }

    protected function generateSlug(string $name): string
    {
        return Str::slug($name);
    }

    protected function getFilters(Request $request): array
    {
        return $request->only($this->filterableFields);
    }

    protected function applyFilters($query, Request $request)
    {
        foreach ($this->filterableFields as $field) {
            if ($request->has($field) && $request->$field && $request->$field !== 'all') {
                $value = $request->$field;
                if ($field === 'search') {
                    $query->where('name', 'like', '%'.$value.'%');
                } else {
                    $query->where($field, $value);
                }
            }
        }

        return $query;
    }

    protected function validateRequest(Request $request, ?int $id = null): array
    {
        $rules = $this->validationRules;

        if ($id) {
            foreach ($rules as $field => $rule) {
                if (is_array($rule)) {
                    $newRules = [];
                    foreach ($rule as $r) {
                        if (str_contains($r, 'unique:')) {
                            $r = str_replace(':id', ','.$id, $r);
                        }
                        $newRules[] = $r;
                    }
                    $rules[$field] = $newRules;
                } elseif (str_contains($rule, 'unique:')) {
                    $rules[$field] = str_replace(':id', ','.$id, $rule);
                }
            }
        }

        return $request->validate($rules);
    }

    protected function prepareData(array $data): array
    {
        if (empty($data['slug']) && ! empty($data['name'])) {
            $data['slug'] = $this->generateSlug($data['name']);
        }

        return $data;
    }

    protected function getStats(): array
    {
        $model = $this->modelClass;

        return [];
    }
}
